import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  saveDraftAsync,
  deleteDraft,
  updateDraft,
  publishDraft,
  loadDrafts,
} from "../features/posts/postsSlice";

import { setPlatform } from "../features/platform/platformSlice";

import {
  selectDrafts,
  selectPublishedCount,
} from "../selectors/postSelectors";

import StatsPanel from "./StatsPanel";

import "./DraftManager.css";

export default function DraftManager() {

  const dispatch = useDispatch();

  const drafts = useSelector(selectDrafts);

  const published = useSelector(selectPublishedCount);

  const platform = useSelector(
    (state) => state.platform.currentPlatform.name
  );

  const loading = useSelector(
    (state) => state.posts.loading
  );

  const [post, setPost] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  useEffect(() => {

    const savedDrafts = JSON.parse(
      localStorage.getItem("drafts")
    );

    if (savedDrafts) {

      dispatch(loadDrafts(savedDrafts));

    }

  }, [dispatch]);

  useEffect(() => {

    localStorage.setItem(
      "drafts",
      JSON.stringify(drafts)
    );

  }, [drafts]);

  const platformCounts = useMemo(() => {

    return drafts.reduce(

      (counts, draft) => {

        counts[draft.platform]++;

        return counts;

      },

      {

        Facebook: 0,
        Twitter: 0,
        Instagram: 0,
        LinkedIn: 0,

      }

    );

  }, [drafts]);

  const longestDraft = useMemo(() => {

    if (drafts.length === 0) return null;

    return drafts.reduce((longest, current) =>
      current.content.length > longest.content.length
        ? current
        : longest
    );

  }, [drafts]);

  const filteredDrafts = useMemo(() => {

    return drafts.filter((draft) =>
      draft.content
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [drafts, search]);

  const saveDraft = useCallback(async () => {

    if (!post.trim()) {

      alert("Please enter a post.");

      return;

    }

    const draft = {

      id: editingId || Date.now(),

      platform,

      content: post,

      created: new Date().toLocaleString(),

    };

    if (editingId) {

      dispatch(updateDraft(draft));

      setEditingId(null);

    } else {

      await dispatch(saveDraftAsync(draft));

    }

    setPost("");

  }, [

    post,
    platform,
    editingId,
    dispatch,

  ]);

  const editDraft = useCallback((draft) => {

    dispatch(setPlatform(draft.platform));

    setPost(draft.content);

    setEditingId(draft.id);

  }, [dispatch]);

  const removeDraft = useCallback((id) => {

    if (window.confirm("Delete this draft?")) {

      dispatch(deleteDraft(id));

    }

  }, [dispatch]);

  const publishSelectedDraft = useCallback((id) => {

    dispatch(publishDraft(id));

    alert("Draft published successfully!");

  }, [dispatch]);

  return (

    <div className="page">

      <div className="dashboard">

        <h1>📝 Social Media Draft Manager</h1>

        <StatsPanel
          drafts={drafts}
          published={published}
          currentPlatform={platform}
          platformCounts={platformCounts}
          longestDraft={longestDraft}
        />

        <div className="composer">

          <label>Select Platform</label>

          <select
            value={platform}
            onChange={(e) =>
              dispatch(setPlatform(e.target.value))
            }
          >

            <option>Facebook</option>

            <option>Twitter</option>

            <option>Instagram</option>

            <option>LinkedIn</option>

          </select>

          <textarea
            placeholder="Write your post..."
            value={post}
            onChange={(e) =>
              setPost(e.target.value)
            }
          />
                    <div className="buttons">

            <button
              className="save"
              onClick={saveDraft}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Draft"
                : "Save Draft"}
            </button>

            <button
              className="clear"
              onClick={() => {
                setPost("");
                setEditingId(null);
              }}
            >
              Clear
            </button>

          </div>

          <div className="draftSection">

            <h2>📂 Saved Drafts</h2>

            <input
              type="text"
              className="searchBox"
              placeholder="🔍 Search drafts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {filteredDrafts.length === 0 ? (

              <div className="emptyState">

                <h3>No Drafts Available</h3>

                <p>
                  Save your first draft to see it here.
                </p>

              </div>

            ) : (

              filteredDrafts.map((draft) => (

                <div
                  key={draft.id}
                  className="draftCard"
                >

                  <div className="draftHeader">

                    <h3>{draft.platform}</h3>

                    <span>{draft.created}</span>

                  </div>

                  <p className="draftContent">

                    {draft.content}

                  </p>

                  <div className="draftButtons">

                    <button
                      className="edit"
                      onClick={() =>
                        editDraft(draft)
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        removeDraft(draft.id)
                      }
                    >
                      🗑 Delete
                    </button>

                    <button
                      className="publish"
                      onClick={() =>
                        publishSelectedDraft(
                          draft.id
                        )
                      }
                    >
                      🚀 Publish
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>
                  </div>

      </div>

    </div>

  );

}