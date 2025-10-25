import Banner from "@/components/modules/home/Banner";
import CallUs from "@/components/modules/home/CallUs";
import Deliver from "@/components/modules/home/Deliver";
import JoinCrew from "@/components/modules/home/JoinCrew";
import Service from "@/components/modules/home/Service";
import Testimonial from "@/components/modules/home/Testimonial";

export default function Home() {
  return (
    <div>
      <Banner />
      <hr className="border-t border-gray-200 my-10" />
      <CallUs />
      <Service />
      <Deliver />
      <Testimonial />
      <JoinCrew />
    </div>
  );
}
