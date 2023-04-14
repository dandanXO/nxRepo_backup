import {Navigation} from "../../components/layouts/Navigation";
import {PageContent} from "../../components/layouts/PageContent";
import {ProgressItem} from "./ProgressItem";
import { useNavigate } from "react-router";
import {useLazyGetUserProcessQuery} from "../../../api/rtk";
import {useEffect} from "react";
import moment from "moment-timezone";
import CustomerServiceModal from "../../modals/CustomerServiceModal";

const ApplicationProgressPage = () => {
  const navigate = useNavigate();
  const [trigger, {currentData}] = useLazyGetUserProcessQuery();
  useEffect(() => {
    trigger({})
  }, [])

  return (
    <div>
      <Navigation title={"Application progress"} back={() => { navigate(-1) }}/>
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

export default ApplicationProgressPage;
