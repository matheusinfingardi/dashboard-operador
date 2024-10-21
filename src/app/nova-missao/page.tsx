
import DroneDeliveryForm from '../../components/forms/DroneDeliveryForm';
import InfoCard from '../../components/info/InfoCard';

export default function DroneDeliveryPage() {
  return (
    <div className="flex flex-col mb-10 md:flex-row p-6">
      <div className="w-full md:w-1/2 md:mr-14">
        <DroneDeliveryForm />
      </div>
      <div className="w-full md:w-2/3">
        <InfoCard />
      </div>
    </div>
  );
}
