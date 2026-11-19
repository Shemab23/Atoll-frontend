export class HomePageData {
  async getInitialData() {
    return {
      greeting: "Good to see you again.",
      posts: [],
      trendingTopics: [],
      suggestedUsers: [],
      loading: false,
      error: null,
    };
  }

  async getFeed() {
    // Sprint 01+: return realistic mock data.
    // Integration sprint: replace with Express API call.
  }

  async refreshFeed() {
    // Refresh the feed.
  }

  formatPostCount(count: number) {
    return `${count} conversations`;
  }

  getEmptyState() {
    return {
      title: "It's quiet here.",
      description: "Start something interesting.",
    };
  }
}
// return

/**
 * export interface PageState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  retryable: boolean;
}
 */
