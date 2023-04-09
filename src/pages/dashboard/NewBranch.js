import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import BranchNewForm from '../../sections/@dashboard/branch/BranchForm';
// ----------------------------------------------------------------------

export default function NewUser() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');

  return (
    <Page title="Branch: Create a new branch">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new branch' : 'Edit branch'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Branch', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New branch' : "Edit branch" },
          ]}
        />
        <BranchNewForm isEdit={isEdit}  id={id}/>
      </Container>
    </Page>
  );
}
