import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useWordNoteOptions(wordnotes) {
	const { wordNotes } = useSelector((state) => state.wordnote);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		const temp = [];
		for (const wordNote of wordNotes) {
			temp.push({ label: wordNote.name, value: wordNote.id });
		}
		setOptions(temp);
	}, [wordNotes]);

	return options;
}
