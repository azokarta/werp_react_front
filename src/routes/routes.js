import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../App';
import MainPanel from '../components/MainPanel/MainPanel';
import Settings from '../components/UserSettings/Settings';
import RequireAuth from '../components/Auth/require_auth';
import Signin from '../components/Auth/Signin';
import Signout from '../components/Auth/Signout';
import AssignUserBranch from '../dit/userBranch/components/assign_user_branch';
import SpNewPage from '../service/mainoperation/spNew/components/spNewPage';
import SpViewPage from '../service/mainoperation/spView/components/spViewPage';
import SpListPage from '../service/mainoperation/spList/components/spListPage';
import CreateStaff from '../hr/mainoperation/staff/components/CreateStaff';
import ViewStaff from '../hr/mainoperation/staff/components/ViewStaff';
import AccountabilityStaffListPage from '../logistics/report/accountabilityStaff/AccountabilityStaffListPage';
import AccountabilityStaffDetailPage from '../logistics/report/accountabilityStaff/AccountabilityStaffDetailPage';
import KpiReportPage from '../crm/report/kpi/components/KpiReportPage';
import KpiRatingReportPage from '../crm/report/kpi/components/KpiRatingReportPage';
import RecoCurrentPage from '../crm/mainoperation/reco/components/RecoCurrentPage';
import DemoListPage from '../crm/mainoperation/demo/components/DemoListPage';
import Serrep2 from '../service/report/serrep2/serrep2';
import Serrep1 from '../service/report/serrep1/serrep1';
import Serrep3 from '../service/report/serrep3/serrep3';
import ForbiddenPage from '../general/forbidden';

const getComponent = {
    'SpNew': SpNewPage,
    'SpView': SpViewPage,
    'SpList': SpListPage,
    'LogRepAccStaff':AccountabilityStaffListPage,
    'LogRepAccStaffDetail':AccountabilityStaffDetailPage,
    'Serrep2':Serrep2,
    'Serrep1':Serrep1,
    'Serrep3':Serrep3,
    'CrmRepKpi':KpiReportPage,
    'CrmRepKpiRtg':KpiRatingReportPage
}

export default (data) => {
    return (
        <Route path="/" component={App}>
            <IndexRoute component={RequireAuth(MainPanel)} />
            <Route path="settings" component={RequireAuth(Settings)} />
            <Route path="signin" component={Signin} />
            <Route path="signout" component={Signout} />
            <Route path="dit/userBranch" component={AssignUserBranch} />
            <Route path="hr/staff/create" component={CreateStaff} />
            <Route path="hr/staff/view/:id" component={ViewStaff} />
            <Route path="crm/reco/current" component={RecoCurrentPage} />
            <Route path="crm/demo/list" component={DemoListPage} />
            <Route path="forbidden" component={ForbiddenPage} />

            {/* dynamically generated URLs */} 
            {data.map((el) => {
                return <Route path={`${el.url}`} component={getComponent[el.component]} key={el.transactionCode}/>
            })}                      
        </Route>
    )
};
