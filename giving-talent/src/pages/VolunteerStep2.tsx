import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

const VolunteerStep2 = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input id="age" placeholder="Age:" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="countryOg">Country of origin</Label>
        <Input id="countryOg" placeholder="Country of origin:" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="countryTrained">Country of training</Label>
        <Input id="countryTrained" placeholder="Country of training:" />
      </div>
    </div>
  );
};

export default VolunteerStep2;
