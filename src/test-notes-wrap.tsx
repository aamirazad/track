// Temporary test component to verify notes text wrapping fix
import React from "react";

export default function TestNotesWrap() {
  const longNotes = `This is a very long note with a supercalifragilisticexpialidocious word that extends way beyond the normal boundaries and should demonstrate the text wrapping issue where text doesn't wrap properly and extends past the modal boundaries causing horizontal scrolling or text being cut off.

Check out this long URL: https://www.example.com/very/long/path/that/might/cause/wrapping/issues/in/the/modal/component/when/displayed/in/the/notes/section/of/the/application/and/should/wrap/properly/now

And here's some normal text that should wrap nicely within the container boundaries without any issues.`;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Notes Text Wrapping Test</h1>
      
      {/* Test the old behavior (without break-words) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Old Behavior (without break-words)</h2>
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800 border max-w-md">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {longNotes}
          </p>
        </div>
      </div>
      
      {/* Test the new behavior (with break-words) */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">New Behavior (with break-words)</h2>
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800 border max-w-md">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {longNotes}
          </p>
        </div>
      </div>
    </div>
  );
}