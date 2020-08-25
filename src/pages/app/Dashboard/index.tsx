import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../../services/api';

import logo from '../../../assets/img/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem('repositories');

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }

    return [];
  });
  const [inputError, setInputError] = useState('');
  const [newRepository, setNewRepository] = useState('');

  useEffect(() => {
    localStorage.setItem('repositories', JSON.stringify(repositories));
  }, [newRepository]);

  const handleAddRepository = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!newRepository) {
      setInputError('Digite o auto/nome do repositorio');
      return;
    }

    try {
      const { data } = await api.get<Repository>(`/repos/${newRepository}`);

      setRepositories([...repositories, data]);
      setNewRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  };

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore Repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          onChange={({ target: { value } }) => setNewRepository(value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link
            to={`/repository/${repository.full_name}`}
            key={repository.full_name}
            href="teste"
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
