// import * as anchor from '@project-serum/anchor';
import * as anchor from '@coral-xyz/anchor';
import { Crouton } from "./types/crouton";
import idl from "./idl/crouton.json";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

interface userInfo {
    username: string, description: string, image: string,
}

const programId = "FX9ubUxMQNK4bLuUwWzGwweiWBesVAgbfZukkhSkhGwb";

const Seeds = {
    account: utf8.encode("account"),
    post: utf8.encode("post"),
}

export default class CroutonLib {
    public systemId = anchor.web3.SystemProgram.programId;

    private _provider?: anchor.AnchorProvider;
    private _program?: anchor.Program<Crouton>;

    get program() {
        return this._program!;
    }
    get provider() {
        return this._provider!;
    }


    public setup(connection: any, wallet: any) {
        const anchorConnection = new anchor.web3.Connection(
            connection.connection.rpcEndpoint,
            connection.connection.commitment
        );
        this._provider = new anchor.AnchorProvider(
            anchorConnection,
            wallet,
            { "preflightCommitment": connection.connection.commitment }
        );
        this._program = new anchor.Program<Crouton>(
            JSON.parse(JSON.stringify(idl)),
            programId,
            this._provider
        )
    }
    public setupWithProvider(provider: anchor.AnchorProvider) {
        this._provider = provider;
        this._program = new anchor.Program<Crouton>(
            JSON.parse(JSON.stringify(idl)),
            programId,
            this._provider
        )
    }

    private generateKeyPair() {
        return anchor.web3.Keypair.generate();
    }

    private async fetchAccount(accounts: any, address: anchor.Address) {
        if (address == this.systemId) {
            return null;
        }
        try {
            const user = await accounts.fetch(
                address
            );
            return user;
        } catch (e) {
            console.log(`fetch Error ${typeof accounts} address ${address} except ${e}`);
            return null;
        }
    }

    public async fetchUser(userPublicKey: anchor.Address) {
        return await this.fetchAccount(this.program.account.userState, userPublicKey);
    }

    public async fetchPost(postPublicKey: anchor.Address) {
        return this.fetchAccount(this.program.account.postState, postPublicKey);
    }
    public async findPostAndFetch(postUser: anchor.web3.PublicKey, postIndex: number) {
        const pda = await this.findPostPDA(postUser, postIndex);
        return await this.fetchPost(pda);
    }
    get account() {
        return this.program.account;
    }

    get wallet() {
        return this.provider.wallet;
    }

    public async getAllPosts() {
        this.account.postState.all()
    }

    // public async getAllAccountsByAuthority(
    // ) {
    //     console.log(`getAllAccountsByAuthority ${this.wallet.publicKey.toBase58()}`)

    //     return await this.account.userState.all([{
    //         memcmp: { offset: 8, bytes: this.wallet.publicKey.toBase58() }
    //     }]);
    // };
    public async findPDAforAuthority(seeds: any[])
        : Promise<anchor.web3.PublicKey> {
        const [pda, _bump] = await anchor.web3.PublicKey.findProgramAddressSync(
            seeds,
            (typeof (this.program) !== undefined ? this.program.programId : new anchor.web3.PublicKey(programId))
        );
        return pda;
    }

    public async findAccountPDA(publicKey?: anchor.web3.PublicKey) {
        const seeds = [
            Seeds.account,
            publicKey != undefined ? publicKey.toBuffer() : this.wallet.publicKey.toBuffer()
        ]
        return await this.findPDAforAuthority(seeds);
    }

    public async findPostPDA(postUser: anchor.web3.PublicKey, postIndex: number) {
        let indexBN = new anchor.BN(postIndex).toArrayLike(Buffer, 'be', 4);
        console.log("indexBN:" + postIndex + `,postUser ${postUser}`);
        const seeds = [
            Seeds.post,
            postUser.toBuffer(),
            indexBN
            // new Uint8Array([postIndex])
        ]
        return await this.findPDAforAuthority(seeds);
    }

    public async createUser({ username, description, image }: userInfo) {
        const userAccount = await this.findAccountPDA();
        console.log("pdaAccount:" + userAccount);
        try {
            const instruction = this.program.methods.signupUser(
                username
                , description
                , image)
                .accounts({
                    userAccount: userAccount,
                    authority: this.wallet.publicKey,
                    systemProgram: anchor.web3.SystemProgram.programId,
                }
                ).signers([]);
            const sig = await instruction.rpc();
        } catch (error) {
            console.log(`input { username:${username},description: ${description}, image: ${image} } wallet ${this.wallet.publicKey}`);
            console.error(error);
            throw error;
        }
        const user = await this.program.account.userState.fetch(
            userAccount
        );

        return { user, userAccount };
    }

    public async editProfile(userAccount: anchor.web3.PublicKey, { username, description, image }: userInfo) {
        const ret = await this.program.methods.editProfile(
            username
            , description
            , image)
            .accounts({
                userAccount: userAccount,
                authority: this.wallet.publicKey,
            }
            )
            .rpc();

        const user = await this.program.account.userState.fetch(
            userAccount
        );

        return { user, userAccount };
    }


    public async createPost(userAccountPDA: anchor.web3.PublicKey, text: string) {
        const userAccount = await this.fetchUser(userAccountPDA);

        const postAccountPDA = await this.findPostPDA(userAccountPDA, userAccount.posts);
        console.log("post account pda :" + postAccountPDA);
        await this.program.methods.createPost(text)
            .accounts({
                postAccount: postAccountPDA,
                userAccount: userAccountPDA,
                authority: this.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([])
            .rpc();

        const post = await this.fetchPost(postAccountPDA);
        const user = await this.fetchUser(userAccountPDA);

        return { post, postAccountPDA, user };
    }
}