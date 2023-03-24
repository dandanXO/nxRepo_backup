import {Navigation} from "../../components/layouts/Navigation";
import {PageContent} from "../../components/layouts/PageContent";
import {ProgressItem} from "./ProgressItem";

export const ApplicationProgressPage = () => {
  return (
    <div>
      <Navigation title={"Application progress"} back={() => {
        //
      }}/>
      <PageContent>
        <ProgressItem
          title={"Examination passed"}
          content={"Your loan request has been approved, and will be disbursed to your bank account with the end of the account 4 yards, 8366, within 2 hours."}
          date={"2020-03-03 19:07:45"}
        />
        <ProgressItem
          title={"Under review"}
          content={"The order is under review, please keep the phone open and pay attention to answering the phone."}
          date={"2020-03-03 19:07:45"}
        />
        <ProgressItem
          title={"Application submitted successfully"}
          content={"The order you requested has been submitted successfully, please wait patiently for the review. "}
          date={"2020-03-03 19:07:45"}
        />
      </PageContent>
    </div>
  )
}
