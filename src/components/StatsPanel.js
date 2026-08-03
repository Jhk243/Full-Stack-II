import React from "react";

const StatsPanel = React.memo(function StatsPanel({

  drafts,

  published,

  currentPlatform,

  platformCounts,

  longestDraft,

}) {

  console.log("StatsPanel Rendered");

  return (

    <>

      <div className="topCards">

        <div className="stat">

          <h3>Total Drafts</h3>

          <h2>{drafts.length}</h2>

        </div>

        <div className="stat">

          <h3>Published</h3>

          <h2>{published}</h2>

        </div>

        <div className="stat">

          <h3>Platform</h3>

          <h2>{currentPlatform}</h2>

        </div>

      </div>

      <div className="platformStats">

        <h2>📊 Platform Statistics</h2>

        <div className="statsGrid">

          <div className="miniCard">

            📘 Facebook

            <strong>

              {platformCounts.Facebook}

            </strong>

          </div>

          <div className="miniCard">

            🐦 Twitter

            <strong>

              {platformCounts.Twitter}

            </strong>

          </div>

          <div className="miniCard">

            📸 Instagram

            <strong>

              {platformCounts.Instagram}

            </strong>

          </div>

          <div className="miniCard">

            💼 LinkedIn

            <strong>

              {platformCounts.LinkedIn}

            </strong>

          </div>

        </div>

      </div>

      <div className="longestDraft">

        <h2>

          🏆 Longest Draft

        </h2>

        {longestDraft ? (

          <div>

            <p>

              <strong>

                {longestDraft.platform}

              </strong>

            </p>

            <p>

              {longestDraft.content.substring(0,120)}...

            </p>

            <small>

              {longestDraft.content.length}

              {" "}characters

            </small>

          </div>

        ) : (

          <p>

            No drafts available.

          </p>

        )}

      </div>

    </>

  );

});

export default StatsPanel;