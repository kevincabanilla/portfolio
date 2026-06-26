import { Data, Helper } from "@/utils";

export default function LogoInitials() {
  const { fullName } = Data.getPersonalData();
  const initials = Helper.getInitials(fullName);

  return (
    <div className="font-mono font-bold text-secondary tracking-wide">
      <span>{"<"}</span>
      <span className="text-primary">{initials}</span>
      <span>{" />"}</span>
    </div>
  );
}
