import { parseEnumToArray } from '@js-camp/core/enums/enums';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { fetchNextPageOfAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectAnimeList,
  selectAnimeListNextPage,
  selectAreAnimeListLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import { ChangeEvent, FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { QueryParamsMapper, SortingDirectionTypes } from '@js-camp/core/mappers/query-params.mapper';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import { ToggleMenu } from '../../../../app/components/ToggleMenu';

import { AnimeCard } from '../AnimeCard';

const animeTypes = parseEnumToArray(AnimeType);

const AnimeListComponent: FC = () => {

  /**
   * Component state.
   */
  const appDispatch = useAppDispatch();

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);
  const nextAnimeListPage = useAppSelector(selectAnimeListNextPage);

  const [inView, setInView] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

  const [mappedParams, setMappedParams] = useState(QueryParamsMapper.fromDto(queryParams));

  const [searchingTypes, setSearchingTypes] = useState(mappedParams.types);
  const [searchingTitle, setSearchingTitle] = useState(mappedParams.search);
  const [sorting, setSorting] = useState(mappedParams.sorting);

  /**
   * Hooks.
   */
  const loadAnime = useCallback(() => {
    if (nextAnimeListPage) {
      appDispatch(fetchNextPageOfAnimeList(nextAnimeListPage));
    }
  }, [nextAnimeListPage]);

  useEffect(() => {
    if (inView) {
      loadAnime();
    }
  }, [inView]);

  useEffect(() => {
    setQueryParams(QueryParamsMapper.toDto(mappedParams));
  }, [mappedParams]);

  useEffect(() => {
    setMappedParams({
      search: searchingTitle,
      types: searchingTypes,
      sorting,
    });
  }, [searchingTitle, searchingTypes, sorting]);

  /**
   * Prepared components.
   */
  const animeTypeMenuItems = animeTypes.map((item, index) => (
    <MenuItem key={index} value={item}>
      <ListItemText primary={item} />
    </MenuItem>
  ));

  const mappedAnimeList = useMemo(() => animeList.map((anime, index) => {

    const animeCard = (<AnimeCard key={anime.id} anime={anime} />);

    if (index === animeList.length - 1) {
      return <InView key={anime.id} threshold={0.5} root={null} rootMargin='0px' onChange={setInView}>
        {({ ref }) => (
          <div ref={ref}>{animeCard}</div>
        )}
      </InView>;
    }

    return animeCard;
  }), [animeList]);

  const incrementSortingIcon = (
    <NorthIcon fontSize='small' />
  );

  const decrementSortingIcon = (
    <SouthIcon fontSize='small' />
  );

  /**
   * Input handlers.
   */

  const handleSearchChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target: { value } } = event;

    setSearchingTitle(value);
  };

  const handleSelectTypeChanges = (event: SelectChangeEvent<typeof searchingTypes>) => {
    const { target: { value } } = event;

    if (typeof value === 'string') {
      return;
    }

    setSearchingTypes(value);
  };

  const handleSortingTargetChanges = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    setSorting({
      ...sorting,
      target: value,
    });
  };

  const handleSwitchSortingDirection = () => {
    setSorting({
      ...sorting,
      direction: sorting.direction === SortingDirectionTypes.Increment ?
        SortingDirectionTypes.Decrement :
        SortingDirectionTypes.Increment,
    });
  };

  return (
    <>
      <ToggleMenu>
        <Stack spacing={2}>
          <TextField value={searchingTitle} onChange={handleSearchChanges} label='Searching title' variant='outlined' />
          <Divider variant="inset" component="span" />
          <FormControl>
            <InputLabel id='select-anime-types-label'>Types</InputLabel>
            <Select
              labelId='select-anime-types-label'
              multiple
              value={searchingTypes}
              onChange={handleSelectTypeChanges}
              input={<OutlinedInput label='Types' />}
              renderValue={selected => selected.join(',')}
            >
              {animeTypeMenuItems}
            </Select>
          </FormControl>
          <Divider variant="inset" component="span" />
          <FormControl>
            <FormLabel id='select-sorting'>Sorting by</FormLabel>
            <RadioGroup
              onChange={handleSortingTargetChanges}
              aria-labelledby='select-sorting'
              value={sorting.target}
              name='select-sorting-target-radio'
            >
              <FormControlLabel value="status" control={<Radio />} label="Status" />
              <FormControlLabel value="title_eng" control={<Radio />} label="Title english" />
            </RadioGroup>
            <Button
              onClick={handleSwitchSortingDirection}
            >
              Switch direction {sorting.direction === 'dec' ?
                decrementSortingIcon :
                incrementSortingIcon
              }
            </Button>
          </FormControl>
        </Stack>
      </ToggleMenu>
      <List sx={{
        position: 'relative',
      }}>
        { mappedAnimeList }
      </List>
      {isAnimeListLoading && <CircularProgress />}
    </>
  );
};

export const AnimeList = memo(AnimeListComponent);
