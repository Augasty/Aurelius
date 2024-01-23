import { lazy, Suspense } from 'react';
import Dashboard from '../components/dashboard/Dashboard';
import Notification from '../components/notification/Notification';
import TaskList from '../components/tasks/TaskList/TaskList';
const CreateStory = lazy(() => import('../components/stories/CreateStory/CreateStory'));

const CreateTask = lazy(() => import('../components/tasks/createTask/CreateTask'));
const AddMemberInBoard = lazy(() => import('../components/boards/AddMemberInBoard/AddMemberInBoard'));
const SignedOutNavbar = lazy(() => import('../components/navbar/SignedOutNavbar'));
const CreateBoard = lazy(() => import('../components/boards/CreateBoard'));
const Navbar = lazy(() => import('../components/navbar/Navbar'));

const TaskDetails = lazy(() => import('../components/tasks/TaskDetails/TaskDetails'));
const ChatPanel = lazy(() => import('../components/chat-system/ChatPanel'));

const LazyCreateTask = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateTask {...props} />
  </Suspense>
);
const LazyCreateStory = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateStory {...props} />
  </Suspense>
);

const LazyAddMemberInBoard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <AddMemberInBoard {...props} />
  </Suspense>
);

const LazySignedOutNavbar = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <SignedOutNavbar {...props} />
  </Suspense>
);

const LazyCreateBoard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <CreateBoard {...props} />
  </Suspense>
);

const LazyNavbar = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Navbar {...props} />
  </Suspense>
);

const LazyDashboard = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Dashboard {...props} />
  </Suspense>
);


const LazyNotification = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Notification{...props} />
  </Suspense>
);
const LazyTaskList = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskList {...props} />
  </Suspense>
);
const LazyTaskDetails = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskDetails {...props} />
  </Suspense>
);

const LazyChatPanel = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChatPanel {...props} />
  </Suspense>
);
export {
  LazyCreateStory as CreateStory,
  LazyCreateTask as CreateTask,
  LazyAddMemberInBoard as AddMemberInBoard,
  LazySignedOutNavbar as SignedOutNavbar,
  LazyCreateBoard as CreateBoard,
  LazyNavbar as Navbar,
  LazyDashboard as Dashboard,
  LazyNotification as Notification,
  LazyTaskList as TaskList,
  LazyTaskDetails as TaskDetails,
  LazyChatPanel as ChatPanel,
};
