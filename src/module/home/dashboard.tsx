import { Button } from "@/components/ui/button";
import { useUserAccount } from "@/provider/userAccountProvider";
import { FC, ReactNode, useEffect, useState } from "react";

import InputUserForm from "@/module/common/inputUserForm";
import { useCrouton } from "@/provider/croutonProvider";
import { TimelineProvider, useTimeline } from '@/provider/timelineProvider';
import Timeline from '@/module/home/timeline';
import NewPost from '@/module/posts/new-post';


export default function Component() {
  return (
    <div>
      <TimelineProvider>
        <Dashboard />
      </TimelineProvider>
    </div>
  );
}
const Dashboard = ()=>{
  const { userAccount } = useUserAccount();

  const { timeline, setTimeline } = useTimeline();
  const { crouton } = useCrouton();
  const [postIndex, setPostIndex] = useState(0);

  useEffect(
    () => {
      if (userAccount) {
        console.log(`update post index ${userAccount.dataset.posts}`)
        setPostIndex(userAccount.dataset.posts);
      }
    }
    , [userAccount]
  );

  return (
    <div >
      {userAccount ?
        <div>
          <NewPost />
          {
            postIndex > 0 ?
              <div>
                <Timeline PostIndex={postIndex}/>
              </div>
              : ""
          }
        </div>
        : ""
      }
    </div>
  );
}