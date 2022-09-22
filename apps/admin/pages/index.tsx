import Link from "next/link";

export function Index() {
  return (
    <div>
      <div>
        <Link href="/apps/cms/src/app/pages/ProductPage"><a> product </a></Link>
      </div>
      <div>
        <Link href="/apps/cms/src/app/pages/MerchantPage"><a> merchantManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
