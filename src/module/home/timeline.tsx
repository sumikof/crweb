import React, { useEffect, useState } from 'react';
import { useTimeline } from '@/provider/timelineProvider';
import Post from '@/module/posts/post';
import CroutonLib from '@/lib/crouton/crouton';
import { useCrouton } from '@/provider/croutonProvider';

interface PostAccount{
    publicKey: String,
    dataset :{}
}

export default function Component(props: any) {
    const {crouton} = useCrouton();
    const [posts,setPosts] = useState<PostAccount[]>([])

    const postsGenerator  = async function* (postIndex:number){
        let userAccountPDA = await crouton.findAccountPDA();
        let postPda;
        let _post;
        console.log(`get post index ${postIndex}: `+ JSON.stringify(_post));
        while(postIndex > 0){
            postIndex = postIndex -1;
            postPda = await crouton.findPostPDA(userAccountPDA,postIndex );
            _post = {
                publicKey: postPda.toString(),
                dataset:await crouton.fetchPost(postPda)
            };
            yield _post;
        }    
    }
    

    useEffect(()=>{
        (async () => {
          setPosts([]);
            for await (const post of postsGenerator(props.PostIndex)){
                setPosts(p=>[...p,post]);
            }
        })();
    },[props.PostIndex]);

    return (
        <div>
            {
                posts.map(p => <Post publicKey={p.publicKey} post={p.dataset}></Post>)
            }
        </div>
    );
}