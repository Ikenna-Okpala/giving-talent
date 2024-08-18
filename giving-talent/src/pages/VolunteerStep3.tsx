import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

const VolunteerStep3 = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="hours">Hours to volunteer</Label>
        <Input id="hours" placeholder="Hours to volunteer:" />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="eventType">Event type</Label>
        <Input id="eventType" placeholder="Event type:" />
      </div>
    </div>
  );
};

export default VolunteerStep3;
