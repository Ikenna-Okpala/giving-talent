import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

type Props = {
  formData: {
    age: string;
    countryOrigin: string;
    countryTrained: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VolunteerStep2 = ({ formData, handleInputChange }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          value={formData.age}
          placeholder="Age:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="countryOrigin">Country of origin</Label>
        <Input
          id="countryOrigin"
          name="countryOrigin"
          value={formData.countryOrigin}
          placeholder="Country of origin:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="countryTrained">Country of training</Label>
        <Input
          id="countryTrained"
          name="countryTrained"
          value={formData.countryTrained}
          placeholder="Country of training:"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default VolunteerStep2;
