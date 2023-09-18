"use client";

import { observer } from "mobx-react-lite";

// import supabase from "../../config/supabaseClient";
import { useSupabase } from "../../config/supabaseClient";

import { Icon } from "@iconify/react";

import SingleSearch from "./SingleSearch";
import { SkeletonSearch } from "./SkeletonSearch";

import { useSavedSearchesStore } from "../../store/savedSearchesStore/savedSearchesStore";
import { useFiltersStore } from "../../store/filtersStore/filtersStore";

import { ISavedSearches } from "../../store/savedSearchesStore/savedSearchesStore";
import { isSavedSearches } from "../../store/savedSearchesStore/savedSearchesStore";
import { useEffect, useState } from "react";

import { StatusType } from "../../service/request";

const SavedSearches: React.FC = () => {
    const [status, setStatus] = useState<StatusType>("loading");

    const { supabase, user } = useSupabase();

    const {
        savedSearches,
        setSavedSearches,
        visibleSearches,
        deletedSearch,
        changedSearch,
    } = useSavedSearchesStore();

    const fetchSearches = async () => {
        let { data, error } = await supabase
            .from("savedSearches")
            .select()
            .eq("user_id", user?.id ?? "");

        if (error || !data) {
            setStatus("error");
        } else {
            setSavedSearches(data);
            setStatus("idle");
        }
    };

    let deleteSearch = async () => {
        if (deletedSearch) {
            setStatus("loading");

            const { data, error } = await supabase
                .from("savedSearches")
                .delete()
                .eq("id", deletedSearch);

            if (!error) {
                setStatus("idle");
            } else {
                setStatus("error");
            }
        }
    };

    let modifySearch = async () => {
        if (changedSearch) {
            setStatus("loading");

            const { id } = changedSearch;

            const { data, error } = await supabase
                .from("savedSearches")
                .update(changedSearch)
                .eq("id", id);

            if (!error) {
                setStatus("idle");
            } else {
                setStatus("error");
            }
        }
    };

    useEffect(() => {
        if (user) {
            fetchSearches();
        }
    }, [user]);

    useEffect(() => {
        deleteSearch();
    }, [deletedSearch]);

    useEffect(() => {
        modifySearch();
    }, [changedSearch]);

    let searches = savedSearches;

    if (visibleSearches !== "all") {
        searches = savedSearches.filter(
            (item) => item.type === visibleSearches
        );
    }

    switch (status) {
        case "loading":
            return (
                <ul className="mt-5 flex flex-col justify-start gap-3">
                    {[...new Array(7)].map((item, i) => {
                        return <SkeletonSearch key={i}></SkeletonSearch>;
                    })}
                </ul>
            );
        case "idle":
            return (
                <ul className="mt-5 flex flex-col justify-start gap-3">
                    {searches.map(({ id, user_id, ...item }) => {
                        return (
                            <li
                                key={id}
                                className="min-h-[150px] px-3 py-5 flex min-[479px]:justify-start min-[479px]:gap-0  min-[479px]:flex-row flex-col justify-between gap-4 overflow-hidden bg-white shadow-lg ring-1 ring-black ring-opacity-5 sm:rounded-lg"
                            >
                                <SingleSearch
                                    id={id}
                                    user_id={user_id}
                                    item={item}
                                ></SingleSearch>
                            </li>
                        );
                    })}
                </ul>
            );
        case "error":
            return <div>Ошибка</div>;
        default:
            return <div>Ошибка</div>;
    }
};

export default observer(SavedSearches);
