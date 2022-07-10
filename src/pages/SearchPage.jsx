import React, { useEffect, useState } from "react";
import { TagsList } from "../components/TagsList";
import { playlistService } from "../services/playlistService";
import { SearchSection } from "../components/SearchSection";

export const SearchPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    const tags = await playlistService.getTags();
    tags.forEach(async (tag) => {
      tag.playlists = await playlistService.query(tag.title);
    });
    setTags(tags);
  };

  return (
    <section className="search-page">
      <SearchSection />

      {tags && <TagsList tags={tags} />}
    </section>
  );
};
