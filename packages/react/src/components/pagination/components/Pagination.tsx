// eslint-disable react/no-array-index-key

import * as React from 'react';
import { VisuallyHidden } from '../../../helpers';
import { Box } from '../../../layout';
import { theme } from '../../../theme';
import { Text } from '../../../typography';
import IconChevronLeft from './IconChevronLeft';
import IconChevronRight from './IconChevronRight';
import PaginationButton from './PaginationButton';
import PaginationJumpTo from './PaginationJumpTo';

export interface PaginationProps {
  /** Additional CSS classes to give to the pagination. */
  className?: string;
  /** Additional CSS properties to give to the pagination. */
  style?: React.CSSProperties;
  /** The current page number. */
  current: number;
  /** Total number of pages. */
  total: number;
  /**
   * Callback to run when a page number is selected. You can use this to e.g.
   * run setState on your component's page state.
   */
  onSelect?: (page: number) => void;
}

class Pagination extends React.Component<PaginationProps> {
  static displayName = 'Pagination';

  constructor(props: PaginationProps) {
    super(props);

    this.generatePages = this.generatePages.bind(this);
    this.handleSelectPage = this.handleSelectPage.bind(this);
  }

  handleSelectPage(page: number) {
    const { onSelect } = this.props;

    if (onSelect) {
      onSelect(page);
    }
  }

  generatePages(): (number | string)[] {
    const { total, current } = this.props;
    const maxButtons = 5;
    const pageButtons: (number | string)[] = [];

    let startPage: number;
    let endPage: number;

    if (maxButtons && maxButtons < total) {
      startPage = Math.max(Math.min(current - Math.floor(maxButtons / 2), total - maxButtons + 1), 1);
      endPage = startPage + maxButtons - 1;
    } else {
      startPage = 1;
      endPage = total;
    }

    // eslint-disable-next-line no-plusplus
    for (let page = startPage; page <= endPage; ++page) {
      pageButtons.push(page);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        pageButtons.unshift('\u2026');
      }

      pageButtons.unshift(1);
    }

    if (endPage < total) {
      if (endPage < total - 1) {
        pageButtons.push('\u2026');
      }

      pageButtons.push(total);
    }

    return pageButtons;
  }

  render() {
    const { current, className, total } = this.props;
    const pages = this.generatePages();

    return (
      <Box
        className={className}
        display="inline-flex"
        alignItems="center"
        sx={{
          '> :not([hidden]) ~ :not([hidden])': {
            ml: '6px',
          },
        }}
      >
        <PaginationButton color="white" disabled={current === 1} onClick={() => this.handleSelectPage(current - 1)}>
          <VisuallyHidden>Previous Page</VisuallyHidden>
          <IconChevronLeft aria-hidden size={16} fill={theme.colors.grey08} />
        </PaginationButton>
        {pages.map((page, index) => {
          if (typeof page !== 'number') {
            return (
              <PaginationJumpTo total={total} onSelectPage={this.handleSelectPage}>
                {page}
              </PaginationJumpTo>
            );
          }

          return (
            <PaginationButton
              key={index.toString()}
              isActive={page === current}
              onClick={() => (typeof page === 'number' ? this.handleSelectPage(page) : null)}
            >
              <Text scale={300} fontWeight={500}>
                {page}
              </Text>
            </PaginationButton>
          );
        })}
        <PaginationButton disabled={current === total} onClick={() => this.handleSelectPage(current + 1)}>
          <VisuallyHidden>Next Page</VisuallyHidden>
          <IconChevronRight aria-hidden size={16} fill={theme.colors.grey08} />
        </PaginationButton>
      </Box>
    );
  }
}

export default Pagination;
