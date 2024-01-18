import { lazy, Suspense } from 'react';
const  CreateStory = lazy(()=>import('../components/stories/CreateStory/CreateStory')) 

const CreateTask = lazy(() => import('../components/tasks/createTask/CreateTask'));
const AddMemberInBoard = lazy(() => import('../components/layout/boards/AddMemberInBoard/AddMemberInBoard'));
const SignedOutNavbar = lazy(() => import('../components/layout/navbar/SignedOutNavbar'));
const CreateBoard = lazy(() => import('../components/layout/boards/CreateBoard'));
const Navbar = lazy(() => import('../components/layout/navbar/Navbar'));
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const TaskDetails = lazy(() => import('../components/tasks/TaskDetails/TaskDetails'));
const ChatPanel = lazy(()=>import('../components/chat-system/ChatPanel'))

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

const LazyTaskDetails = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskDetails {...props} />
  </Suspense>
);

const LazyChatPanel = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    < ChatPanel{...props} />
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
  LazyTaskDetails as TaskDetails,
  LazyChatPanel as ChatPanel
};
