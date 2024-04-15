import {
    List,
    SimpleList,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    FunctionField,
    SelectInput,
    ShowButton,
    CreateButton,
    Show,
    SimpleShowLayout,
    usePermissions,
    ExportButton,
    FilterButton,
    TopToolbar,
  } from 'react-admin';

import { useRecordContext} from 'react-admin';
import { useMediaQuery } from '@mui/material';

const ListActions = () => (
  <TopToolbar>
      <FilterButton/>
      <RenderCreateButton/>
      <ExportButton/>
  </TopToolbar>
);

const OrganizadorInput = () => (
    <ReferenceInput label="Organizador" source="docente_id" reference="users" alwaysOn >
        <SelectInput
        label="Organizador"
        source="docente_id"
        optionText={record => record && `${record.nombre} ${record.apellidos}`} />
    </ReferenceInput>
)
const actividadesFilters = [
    <TextInput source="q" label="Search" alwaysOn />,
    OrganizadorInput(),
];

const RenderCreateButton = (props) => {
  const { permissions, isLoading } = usePermissions();

  if (!isLoading && (permissions.role === 'docente' || permissions.role === 'admin')) {
    return <CreateButton {...props} />;
  }

  return null;
};

const RenderEditButton = () => {
  const { permissions, isLoading } = usePermissions();
  const record = useRecordContext();
  if (!record || isLoading) return null;
  return (permissions.role === 'admin' || record.ownersId.includes(permissions.id)) && <EditButton />;
};

export const ActividadList = () => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <List filters={actividadesFilters} actions={<ListActions />}>
      {isSmall ? (
        <SimpleList
          primaryText="%{nombre}"
          secondaryText="%{insignia}"
          linkType={(record) => (record.canEdit ? 'edit' : 'show')}
        >
          <RenderEditButton />
        </SimpleList>
      ) : (
        <Datagrid bulkActionButtons={false} >
          <TextField source="id" />
          <TextField source="nombre" />
          <TextField source="insignia" />
          <ReferenceField label="Organizador" source="docente_id" reference="users">
            <FunctionField render={record => record && `${record.nombre} ${record.apellidos}`} />
          </ReferenceField>
          <ShowButton />
          <RenderEditButton />
        </Datagrid>
      )}
    </List>
  );
}

export const ActividadTitle = () => {
  const record = useRecordContext();
  return <span>Actividad {record ? `"${record.nombre}"` : ''}</span>;
};

export const ActividadEdit = () => (
    <Edit title={<ActividadTitle />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="nombre" />
            <TextInput source="insignia" />
            <OrganizadorInput />
        </SimpleForm>
    </Edit>
);

export const ActividadShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="nombre" />
            <TextField source="insignia" />
            <ReferenceField label="Organizador" source="docente_id" reference="users">
                <FunctionField render={record => record && `${record.nombre} ${record.apellidos}`} />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const ActividadCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="nombre" />
            <TextInput source="insignia" />
            <OrganizadorInput />
        </SimpleForm>
    </Create>
);
