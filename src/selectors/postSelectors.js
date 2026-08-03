import { createSelector } from "reselect";

const selectPostsState = (state) => state.posts;

export const selectDrafts = createSelector(
  [selectPostsState],
  (posts) => posts.drafts
);

export const selectPublishedCount = createSelector(
  [selectPostsState],
  (posts) => posts.published
);

export const selectLoading = createSelector(
  [selectPostsState],
  (posts) => posts.loading
);
// Total number of drafts
export const selectTotalDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);

// Group drafts by platform
export const selectDraftsByPlatform = createSelector(
  [selectDrafts],
  (drafts) => {

    const grouped = {};

    drafts.forEach((draft) => {

      if (!grouped[draft.platform]) {
        grouped[draft.platform] = [];
      }

      grouped[draft.platform].push(draft);

    });

    return grouped;

  }
);

// Count drafts for each platform
export const selectPlatformCounts = createSelector(
  [selectDraftsByPlatform],
  (grouped) => ({

    Facebook: grouped.Facebook?.length || 0,

    Twitter: grouped.Twitter?.length || 0,

    Instagram: grouped.Instagram?.length || 0,

    LinkedIn: grouped.LinkedIn?.length || 0,

  })
);

// Longest draft
export const selectLongestDraft = createSelector(
  [selectDrafts],
  (drafts) => {

    if (drafts.length === 0) return null;

    return drafts.reduce((longest, current) =>
      current.content.length > longest.content.length
        ? current
        : longest
    );

  }
);