import Link from "next/link";

export function Index() {
  return (
    <div>
      <div>
        <Link href="/packages/cms-webpack4/src/pages/ProductPage"><a> product </a></Link>
      </div>
      <div>
        <Link href="/packages/cms-webpack4/src/pages/MerchantPage"><a> merchantManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
