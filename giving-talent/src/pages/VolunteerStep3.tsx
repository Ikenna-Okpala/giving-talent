import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

type Props = {
  formData: {
    volunteerHours: string;
    eventType: string;
    talent: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VolunteerStep3 = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="hours">Hours to volunteer</Label>
        <Input
          id="volunteerHours"
          name="volunteerHours"
          value={formData.volunteerHours}
          placeholder="Hours to volunteer:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="eventType">Event type</Label>
        <Input
          id="eventType"
          name="eventType"
          value={formData.eventType}
          placeholder="Event type:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="talent">Talent</Label>
        <Input
          id="talent"
          name="talent"
          value={formData.talent}
          placeholder="Talent:"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default VolunteerStep3;
