import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../../services/api';

import logo from '../../../assets/img/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  title: string;
  html_url: string;
  id: number;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const {
    params: { repository: repositoryName },
  } = useRouteMatch<RepositoryParams>();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Repository | null>(null);

  useEffect(() => {
    api.get(`/repos/${repositoryName}`).then(({ data }) => {
      setRepository(data);
    });

    api.get(`/repos/${repositoryName}/issues`).then(({ data }) => {
      setIssues(data);
    });
  }, [repositoryName]);

  return (
    <>
      <Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronsLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertos</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((issue) => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={16} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
