import Link from "next/link";

export function Index() {
  return (
    <div>
      <div>
        <Link href="/product"><a> product </a></Link>
      </div>
      <div>
        <Link href="/merchantManage"><a> merchantManage </a></Link>
      </div>
    </div>
  );
}

export default Index;
