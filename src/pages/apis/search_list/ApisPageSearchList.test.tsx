import { render, screen, waitFor } from '@testing-library/react';

import mockMatchMedia from 'mocks/matchMedia';

import GitHubApiSource from 'api_sources/github/GitHubApiSouce';
import SpotifyApiSource from 'api_sources/spotify/SpotifyApiSource';

import searchGitHub from 'api_sources/github/searchGitHub';
import searchSpotify from 'api_sources/spotify/searchSpotify';

import ApisPageSearchList from './ApisPageSearchList';

type TestParams = {
  apiSourceKey?: string;
  totalCount?: 400;
};

jest.mock('api_sources/github/searchGitHub');
jest.mock('api_sources/spotify/searchSpotify');

describe('ApisPageSearchList', () => {
  const setup = (
    params: TestParams = {
      apiSourceKey: GitHubApiSource.key,
      totalCount: 400,
    }
  ) => {
    const { apiSourceKey = GitHubApiSource.key, totalCount = 400 } = params;

    mockMatchMedia();

    const searchGitHubMock = jest.fn();
    (searchGitHub as jest.Mock).mockImplementation(searchGitHubMock);

    searchGitHubMock.mockImplementation(async () => ({
      totalCount,
      items: [],
    }));

    const searchSpotifyMock = jest.fn();
    (searchSpotify as jest.Mock).mockImplementation(searchSpotifyMock);

    render(
      <ApisPageSearchList
        selectedKey={apiSourceKey}
        unselectKey={() => jest.fn()}
      ></ApisPageSearchList>
    );

    return { searchGitHubMock, searchSpotifyMock };
  };

  test('it should search without query parameters when it first load and GitHub is selected', async () => {
    const { searchGitHubMock } = setup();

    await waitFor(() => expect(searchGitHubMock).toBeCalledWith());
    expect(searchGitHubMock).toBeCalledTimes(1);
  });

  test('it should search without query parameters when it first load and Spotify is selected', async () => {
    const { searchSpotifyMock } = setup({ apiSourceKey: SpotifyApiSource.key });

    await waitFor(() => expect(searchSpotifyMock).toBeCalledWith());
    expect(searchSpotifyMock).toBeCalledTimes(1);
  });

  test('it should show total results count when first search is completed', async () => {
    setup();

    const resultsText = await screen.findByText(': 400');
    expect(resultsText).toBeVisible();
  });
});