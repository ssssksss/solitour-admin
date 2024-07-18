
interface IDashboard {

}

const Dashboard = (props: IDashboard) => {

  return (
    <div className={"flex w-full flex-col"}>
          지도
      <div id="map" style={{ width: "100%", height: "1200px" }} className={"bg-red-100"} />
    </div>
  );
};
export default Dashboard