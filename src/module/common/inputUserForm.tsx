import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"
import { useForm } from 'react-hook-form';
import { useUserAccount } from "@/provider/userAccountProvider"

export default function Component(props:any) {
    const { register, handleSubmit } = useForm();
    const {userAccount} = useUserAccount();

    return (
        <div className="flex items-center justify-center bg-green-500">
        <Card>
          <CardContent>
            <div className="space-y-8">
              <form onSubmit={handleSubmit(props.onSubmit)}>
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">
                    {userAccount?"Edit Profile":"Signup User"}
                  </h2>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Enter Your Profile.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        {...register('name')}
                        defaultValue={userAccount?userAccount.dataset.username:""}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="image">Icon</Label>
                      <Input
                        id="image"
                        placeholder="Enter your icon image url(http://xxxxx or id://xxxxx)"
                        {...register('image')}
                        defaultValue={userAccount?userAccount.dataset.image:""}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      className="min-h-[100px]"
                      id="description"
                      placeholder="Enter your description"
                      {...register('description')}
                      defaultValue={userAccount?userAccount.dataset.description:""}
                    />
                  </div>
                  <Button className="bg-gray-800 text-white" type="submit">
                    {userAccount?"Edit":"Signup"}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}