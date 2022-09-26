import Link from "next/link";

export function Index() {
  return (
    <div>
      <div>
        <Link href="/product"><a> product </a></Link>
      </div>
      <div>
        <Link href="/merchant"><a> merchantManage </a></Link>
      </div>
      <div>
        <Link href="/apps/cms/src/app/pages/user"><a> userManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
