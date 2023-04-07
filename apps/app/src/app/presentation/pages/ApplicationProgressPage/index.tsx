import {Navigation} from "../../components/layouts/Navigation";
import {PageContent} from "../../components/layouts/PageContent";
import {ProgressItem} from "./ProgressItem";
import {useNavigate} from "react-router-dom";
import {useLazyGetUserProcessQuery} from "../../../api";
import {useEffect} from "react";
import moment from "moment-timezone";

export const ApplicationProgressPage = () => {
  const navigate = useNavigate();
  const [trigger, {currentData}] = useLazyGetUserProcessQuery();
  useEffect(() => {
    trigger({})
  }, [])

  return (
    <div>
      <Navigation title={"Application progress"} back={() => {
        navigate("/")
      }}/>
      <PageContent>
        {currentData?.map((news) => {
            return (
              <ProgressItem
                title={news.title}
                content={news.content}
                date={moment(news.addTime).format("MM-DD-YYYY HH:mm:ss")}
              />
            )
        })}
      </PageContent>
    </div>
  )
}
