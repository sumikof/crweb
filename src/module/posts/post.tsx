import { Card } from "@/components/ui/card"
import { useCrouton } from '@/provider/croutonProvider';
import { useEffect, useState } from "react";
import dayjs from "dayjs"

export default function Component(props: any) {
  const { crouton } = useCrouton();
  const [user, setUser] = useState<any>(null!);
  const formatDate = (unixtime: string) => {
    return dayjs(Number(unixtime) * 1000).format('YYYY/MM/DD HH:MM');
  }
  useEffect(() => {
    crouton.fetchUser(props.post.userAccount).then(
      (user: any) => {
        setUser(user);
      }
    )
  }, [props.post.userAccount]
  )
  return (
    <Card
      key="1"
      className="w-[500px] mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-3xl m-3"
    >
      <p className="text-gray-400 dark:text-gray-300">
        {props.publicKey}
      </p>
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <span className="object-cover md:w-48 rounded-md bg-muted w-[192px] h-[192px]" />
        </div>
        <div className="p-8 w-full">
          <div className="flex items-center justify-between">
            {user ?
              <div className="flex items-center">
                <img
                  alt="Profile picture"
                  className="rounded-full"
                  height="40"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
                <div className="ml-4">

                  <div className="tracking-wide text-sm ">
                    <p
                      className="text-black dark:text-white font-semibold"
                    >
                      {user.username}
                    </p>
                    <p
                      className="text-gray-400 dark:text-gray-300"
                    >
                      {props.post.userAccount.toString()}
                    </p>
                  </div>

                </div>
              </div>
              : ""}
          </div>
          <p className="mt-4 text-gray-500 dark:text-gray-300">
            {props.post.content}
          </p>
          <div className="flex mt-6 justify-between items-center">
            <div className="text-gray-400 dark:text-gray-300">
              {formatDate(props.post.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}