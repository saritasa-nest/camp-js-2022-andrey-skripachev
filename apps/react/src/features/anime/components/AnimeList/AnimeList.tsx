import { useSearchParams } from 'react-router-dom';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';
import {
  Button,
  Box,
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
  Stack,
  TextField,
} from '@mui/material';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import { fromSearchParams, SortingDirectionTypes, toSearchParams } from '@js-camp/core/mappers/query-params.mapper';
import { parseEnumToArray } from '@js-camp/core/enums/enums';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { fetchNextPageOfAnimeList } from '@js-camp/react/store/animeList/dispatchers';
import {
  selectAnimeList,
  selectAnimeListNextPage,
  selectAreAnimeListLoading,
} from '@js-camp/react/store/animeList/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { ToggleMenu } from '../../../../app/components/ToggleMenu';

import { AnimeCard } from '../AnimeCard';

import styles from './AnimeList.module.css';

const animeTypes = parseEnumToArray(AnimeType);

const incrementSortingIcon = (
  <NorthIcon fontSize='small' />
);

const decrementSortingIcon = (
  <SouthIcon fontSize='small' />
);

const AnimeListComponent: FC = () => {

  /** Component state. */
  const appDispatch = useAppDispatch();

  const animeList = useAppSelector(selectAnimeList);
  const isAnimeListLoading = useAppSelector(selectAreAnimeListLoading);
  const nextAnimeListPage = useAppSelector(selectAnimeListNextPage);

  const [inView, setInView] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [mappedParams, setMappedParams] = useState(fromSearchParams(searchParams));

  /** Hooks. */
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
    setSearchParams(toSearchParams(mappedParams));
  }, [mappedParams]);

  /** Prepared components. */
  const animeTypeMenuItems = animeTypes.map((item, index) => (
    <MenuItem key={index} value={item}>
      <ListItemText primary={item} />
    </MenuItem>
  ));

  const animeCardList = useMemo(() => animeList.map((anime, index) => {
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

  /** Input handlers. */

  const handleListControlsChanges = <T extends unknown>(value: T, field: keyof typeof mappedParams) => {
    setMappedParams({
      ...mappedParams,
      [field]: value,
    });
  };

  return (
    <Box className={styles.relative}>
      <List>
        { animeCardList }
      </List>
      <ToggleMenu>
        <Stack spacing={2}>
          <TextField
            value={mappedParams.search}
            onChange={event => {
              handleListControlsChanges(event.target.value, 'search');
            }}
            label='Searching title'
            variant='outlined'
          />
          <Divider variant="inset" component="span" />
          <FormControl>
            <InputLabel id='select-anime-types-label'>Types</InputLabel>
            <Select
              labelId='select-anime-types-label'
              multiple
              value={mappedParams.types}
              onChange={event => {
                if (typeof event !== 'string') {
                  handleListControlsChanges(event.target.value, 'types');
                }
              }}
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
              onChange={event => {
                handleListControlsChanges(event.target.value, 'sortingTarget');
              }}
              aria-labelledby='select-sorting'
              value={mappedParams.sortingTarget}
              name='select-sorting-target-radio'
            >
              <FormControlLabel value="status" control={<Radio />} label="Status" />
              <FormControlLabel value="title_eng" control={<Radio />} label="Title english" />
            </RadioGroup>
            <Button
              onClick={() => {
                const currentDirection = mappedParams.sortingDirection;
                const newDirection: SortingDirectionTypes = currentDirection === SortingDirectionTypes.Decrement ?
                  SortingDirectionTypes.Increment : SortingDirectionTypes.Decrement;
                handleListControlsChanges(newDirection, 'sortingDirection')
              }}
            >
              Switch direction {mappedParams.sortingDirection === 'dec' ?
                decrementSortingIcon :
                incrementSortingIcon
              }
            </Button>
          </FormControl>
        </Stack>
      </ToggleMenu>
      {isAnimeListLoading && <CircularProgress />}
    </Box>
  );
};

export const AnimeList = memo(AnimeListComponent);
