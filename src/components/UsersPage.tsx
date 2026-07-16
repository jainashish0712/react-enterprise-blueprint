import { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetUsersQuery, type User } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { CounterButton } from './Home';
import { useDebounce } from "../hooks/useDebounce";

const PageContainer = styled('div')({
  padding: '20px',
  textAlign: 'center'
});

const DataGridContainer = styled('div')({
  height: 400,
  width: '100%',
  marginTop: '20px'
});

const SearchContainer = styled('div')({
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px'
});

const SearchInputGroup = styled('div')({
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  alignItems: 'center'
});

const SearchInput = styled('input')({
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  background: 'var(--bg)',
  color: 'var(--text-h)'
});

const SelectInput = styled('select')({
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  background: 'var(--bg)',
  color: 'var(--text-h)'
});

const SearchHelper = styled('p')({
  fontSize: '0.8rem',
  color: '#666',
  marginTop: '5px'
});

type SearchField = 'all' | keyof User;

export default function UsersPage() {
  const { data, error, isLoading } = useGetUsersQuery();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("all");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredRows = useMemo(() => {
    if (!data?.users) return [];
    
    if (!debouncedSearchTerm) return data.users;

    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();

    return data.users.filter((user) => {
      if (searchField === 'all') {
        return Object.values(user).some(val => 
          String(val).toLowerCase().includes(lowerCaseTerm)
        );
      } else {
        const value = user[searchField];
        return String(value).toLowerCase().includes(lowerCaseTerm);
      }
    });
  }, [data, debouncedSearchTerm, searchField]);

  return (
    <PageContainer>
      <CounterButton onClick={() => navigate("/")} style={{ marginBottom: "20px" }}>
        Back to Home
      </CounterButton>

      <SearchContainer>
        <SearchInputGroup>
          <SelectInput 
            value={searchField} 
            onChange={(e) => setSearchField(e.target.value as SearchField)}
          >
            <option value="all">All Fields</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="username">Username</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
            <option value="phone">Phone</option>
          </SelectInput>
          <SearchInput
            type="text"
            placeholder={`Search ${searchField === 'all' ? 'users' : searchField}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchInputGroup>
        <SearchHelper>Debounced search active</SearchHelper>
      </SearchContainer>

      {isLoading && <p>Loading users...</p>}
      {error && <p>Error loading users</p>}

      <DataGridContainer>
        <DataGrid
          columns={[
            { field: "id", headerName: "ID", width: 30 },
            { field: "firstName", headerName: "First Name", width: 150 },
            { field: "lastName", headerName: "Last Name", width: 150 },
            { field: "age", headerName: "Age", width: 100 },
            { field: "username", headerName: "Username", width: 150 },
            { field: "role", headerName: "Role", width: 120 },
            { field: "email", headerName: "Email", width: 250 },
            { field: "phone", headerName: "Phone", width: 150 },
          ]}
          rows={filteredRows}
        />
      </DataGridContainer>
    </PageContainer>
  );
}
