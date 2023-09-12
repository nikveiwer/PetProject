import { AuthButtons } from "../../../src/components/authAndRegPage/AuthButtons";
import { SignInAndUp } from "../../../src/components/authAndRegPage/SignInAndUp";

export default async function Auth({ params }: { params: { type: string } }) {
    return <SignInAndUp type={params.type} />;
}
