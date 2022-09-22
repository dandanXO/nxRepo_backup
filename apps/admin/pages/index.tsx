import Link from "next/link";

export function Index() {
  return (
    <div>
      <div>
        <Link href="/apps/cms/src/app/pages/product"><a> product </a></Link>
      </div>
      <div>
        <Link href="/apps/cms/src/app/pages/merchantManage"><a> merchantManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
