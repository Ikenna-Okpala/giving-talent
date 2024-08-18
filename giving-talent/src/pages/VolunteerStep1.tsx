import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

const VolunteerStep1 = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Name:" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="Email:" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="number">Number</Label>
        <Input id="number" placeholder="Number:" />
      </div>
    </div>
  );
};

export default VolunteerStep1;
