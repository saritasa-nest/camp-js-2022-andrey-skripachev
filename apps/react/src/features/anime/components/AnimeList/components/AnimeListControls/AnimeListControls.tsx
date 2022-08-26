import { FC, memo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

import { fromSearchParams, SortingDirectionTypes, toSearchParams } from '@js-camp/core/mappers/query-params.mapper';
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { parseEnumToArray } from '@js-camp/core/enums/enums';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

import { ToggleMenu } from '../../../../../../app/components/ToggleMenu';

const animeTypes = parseEnumToArray(AnimeType);

const incrementSortingIcon = (
  <NorthIcon fontSize='small' />
);

const decrementSortingIcon = (
  <SouthIcon fontSize='small' />
);

const AnimeListControlsComponent: FC = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const [mappedParams, setMappedParams] = useState(fromSearchParams(searchParams));

  useEffect(() => {
    setSearchParams(toSearchParams(mappedParams));
  }, [mappedParams]);

  const animeTypeMenuItems = animeTypes.map((item, index) => (
    <MenuItem key={index} value={item}>
      <ListItemText primary={item} />
    </MenuItem>
  ));

  /* The type is inherited from the unknown because the <T> type is taken as a jsx element */
  const handleListControlsChanges = <T extends unknown>(value: T, field: keyof typeof mappedParams) => {
    setMappedParams({
      ...mappedParams,
      [field]: value,
    });
  };

  return (
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
              handleListControlsChanges(newDirection, 'sortingDirection');
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
  );
};

export const AnimeListControls = memo(AnimeListControlsComponent);
