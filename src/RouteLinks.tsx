import Login  from "./components/Login";
import { Routes, Route } from "react-router-dom";
import AddTraining from "./components/AddTraining";
import ChangePassword from "./components/ChangePassword";
import HomeStart from "./components/HomeStart";
import TraineeProfile from "./components/TraineeProfile";
import TraineeRegistration from "./components/TraineeRegistration";
import TraineeTrainings from "./components/TraineeTrainingsLog";
import TrainerProfile from "./components/TrainerProfile";
import TrainerRegistration from "./components/TrainerRegistration";
import TrainerTrainings from "./components/TrainerTrainingsLog";
import UpdateTraineeProfile from "./components/UpdateTraineeProfile";
import UpdateTrainerProfile from "./components/UpdateTrainerProfile";
import NotFoundPage from "./components/NotFoundPage";
import { AboutUs, ContactUs, TermsConditions } from "./components/HomePage";
import DeleteTrainee from "./components/DeleteTrainee";

export function RouteLinks() {
    return (
    <div className="component-nav-links">
          <Routes>
            <Route path="/home" Component={HomeStart} />
            <Route path="/traineeRegistration" Component={TraineeRegistration} />
            <Route path="/trainerRegistration" Component={TrainerRegistration} />
            <Route path="/login" Component={Login} />
            <Route path="/traineeProfile" Component={TraineeProfile}/>
            <Route path="/trainerProfile" Component={TrainerProfile}/>
            <Route path="/changePassword" Component={ChangePassword}/>
            <Route path="/updateTraineeProfile" Component={UpdateTraineeProfile}/>
            <Route path="/updateTrainerProfile" Component={UpdateTrainerProfile}/>
            <Route path="/traineeTrainingsLog" Component={TraineeTrainings}/>
            <Route path="/trainerTrainingsLog" Component={TrainerTrainings}/>
            <Route path="/addTraining" Component={AddTraining}/>
            <Route path="/notFound" Component={NotFoundPage}/>
            <Route path="/aboutUs" Component={AboutUs}/>
            <Route path="/termsAndConditions" Component={TermsConditions}/>
            <Route path="/contactUs" Component={ContactUs}/>
            <Route path="/deleteTrainee" Component={DeleteTrainee}/>
          </Routes>
      </div>
    );
}
export default RouteLinks;