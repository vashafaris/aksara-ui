import avatar from './avatar';
import badge from './badge';
import button from './button';
import card from './card';
import form from './form';
import message from './message';
import pill from './pill';
import typography from './typography';
import tooltip from './tooltip';

/**
 * Custom theme props based on custom component variants.
 */
const componentStyles = {
  avatar,
  badge,
  ...button,
  card,
  ...form,
  ...message,
  pill,
  ...typography,
  ...tooltip,
};

export default componentStyles;
