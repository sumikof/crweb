import { Button } from "@/components/ui/button";
import InputUserForm from "../common/inputUserForm";
import UserEditModal from "@/module/common/crouton-modal";
import { useUserAccount } from "@/provider/userAccountProvider";
import { useState } from "react";
import { useCrouton } from "@/provider/croutonProvider";

export default function Component() {
  const { userAccount, setUserAccount } = useUserAccount();
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const { crouton } = useCrouton();

  const editProfile = async (formdata: any) => {

    const { user, userAccount: updateUserAccount } = await crouton.editProfile(userAccount, { username: formdata.name, description: formdata.description, image: formdata.image })
    setUserAccount({
      publicKey: updateUserAccount.publicKey,
      dataset: user
    });
    setEditModalIsOpen(false);
  };

  console.log(JSON.stringify(userAccount));
  return (
    <div>
      <p>address:{userAccount.publicKey.toString()}</p>
      <p>username:{userAccount.dataset.username.toString()}</p>
      <p>description:{userAccount.dataset.description.toString()}</p>
      <p>verified:{userAccount.dataset.verified.toString()}</p>
      <p>image:{userAccount.dataset.image.toString()}</p>
      <p>posts:{userAccount.dataset.posts.toString()}</p>
      <div>
        <Button
          variant="default"
          color="primary"
          onClick={() => setEditModalIsOpen(true)}
        >
          Edit Profile2
        </Button>
        <UserEditModal isOpen={editModalIsOpen} setClose={() => { setEditModalIsOpen(false); }}>
          <InputUserForm onSubmit={editProfile} />
        </UserEditModal>
      </div>
    </div>
  );
}