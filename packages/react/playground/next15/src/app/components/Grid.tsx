import { storyblokEditable } from '@storyblok/react/rsc';

const Grid = ({ blok }: { blok: any }) => {
  return (
    <h2 data-cy="teaser" {...storyblokEditable(blok)}>
      This is a Grid component
    </h2>
  );
};

export default Grid;
