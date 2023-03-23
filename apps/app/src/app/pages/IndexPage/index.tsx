import {BiHide, RiCustomerServiceLine} from "react-icons/all";

export const IndexPage = () => {
  return (
    <div className={"container"}>
      <div className={"flex flex-col"}>
        <div className={"marquee p-1 bg-orange-300"}>Lorem Ipsum is simply dummy text of the printing </div>

        <div className={"info h-42 bg-orange-100 mb-3"}>
          <div className={"pt-2 px-3 flex flex-col items-center"}>

            <div className={"welcome-info w-full flex flex-row justify-between mb-2"}>
              <div className={"left-section flex flex-row"}>
                <div className={"welcome pr-2 font-medium"}>Welcome 901*****123</div>
                <div className={"hide-icon"}>
                  <BiHide/>
                </div>
              </div>
              <div className={"right-section"}>
                <div className={"contact-icon"}><RiCustomerServiceLine/></div>
              </div>
            </div>

            <div className={"loan-amount flex flex-col p-2 text-center bg-orange-400 w-full rounded-t-lg"}>
              <div className={"text-white"}>Maximum Loan Amount up to</div>
              <div className={"text-white text-2xl font-bold"}>₹ 10,000-30,000</div>
            </div>
          </div>
        </div>

        <div className={"content px-3"}>

          <div className={"ad flex flex-row justify-around mb-3"}>
            <div className={"flex flex-row"}>
              <div className={"flex flex-col justify-center"}>
                <div className={"rounded-full bg-gray-300 mr-3 w-10 h-10 text-center"}>icon</div>
              </div>
              <div className={"info"}>
                <div className={"name"}>Interest rate</div>
                <div className={"value text-2xl"}>1.2-2.8%</div>
              </div>
            </div>
            <div className={"flex flex-row justify-center"}>
              <div className={"flex flex-col justify-center"}>
                <div className={"rounded-full bg-gray-300 mr-3 w-10 h-10 text-center"}>icon</div>
              </div>
              <div className={"info"}>
                <div className={"name"}>Loan Term</div>
                <div className={"value text-2xl"}>91+ days</div>
              </div>
            </div>
          </div>

          <div className={"authentication mb-3"}>
            <div className={"rounded-lg bg-blue-500 p-2 text-white text-center shadow-lg shadow-gray-400"}>Get my limit</div>
          </div>
          <div className={"ad-banner"}>
            <div className={"rounded-lg bg-green-800 p-10 text-center text-white"}>廣告圖塊</div>
          </div>
        </div>
      </div>

      <div className={"flex"}>
        <div className={""}>
          <RiCustomerServiceLine/>
          <div>Loan</div>
        </div>
        <div className={""}>
          <RiCustomerServiceLine/>
          <div>Loan</div>
        </div>
        <div className={""}>
          <RiCustomerServiceLine/>
          <div>Loan</div>
        </div>
      </div>
    </div>
  )
}
