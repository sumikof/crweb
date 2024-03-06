import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import CroutonLib from '@/lib/crouton/crouton';
import { useCrouton } from '@/provider/croutonProvider';
import { useUserAccount } from '@/provider/userAccountProvider';
import React from 'react';
import { useForm } from 'react-hook-form';
export default function Component() {
  const { userAccount,setUserAccount } = useUserAccount();
  const { register, handleSubmit } = useForm();
  const { crouton } = useCrouton();

  const newPost = async (formdata: any) => { 
    const { post, postAccount,user } = await crouton.createPost(
     userAccount.publicKey,formdata.text,"");

    setUserAccount({
      publicKey: userAccount.publicKey,
      dataset: user
    });
  };
  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(newPost)}>
        <div>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">
              New Post
            </h2>
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">text</Label>
            <Textarea
              className="min-h-[100px]"
              id="text"
              placeholder="Enter your text"
              {...register('text')}
            />
          </div>
          <Button className="bg-gray-800 text-white" type="submit">
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}