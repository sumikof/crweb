import { useUserAccount } from "@/provider/userAccountProvider"
import InputUserForm from "@/module/common/inputUserForm";
import { useCrouton } from '@/provider/croutonProvider';

export default function Component() {
  const { setUserAccount } = useUserAccount();
  const { crouton } = useCrouton();

  const initAccount = async (formdata: any) => {

    const { user, userAccount } = await crouton.createUser(
      { username: formdata.name, description: formdata.description, image: formdata.image });

    setUserAccount({
      publicKey: userAccount.publicKey,
      dataset: user
    });
  };

  return (
    <InputUserForm onSubmit={initAccount} />
  )
}