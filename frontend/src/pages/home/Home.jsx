import { MessageContainer } from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import useLogout from "../../hooks/useLogout";
import Loader from "../../components/general/Loader"

const Home = () => {
  const {loading} = useLogout();

  if(loading) {
    return(
      <Loader />
    );
  }

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />

    </div>
  )
}

export default Home;