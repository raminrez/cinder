import { useId, useState, type ReactNode } from "react";
import { DropZone, FileTrigger } from "react-aria-components";
import { Button } from "./buttons";
import { Icon } from "./icons";

export function acceptsFile(
  file: Pick<File, "name" | "type" | "size">,
  acceptedFileTypes: readonly string[] = [],
  maxSize?: number,
): string | null {
  if (maxSize != null && file.size > maxSize) return `${file.name} exceeds the size limit.`;
  const mime = file.type.split(";", 1)[0]!.trim().toLowerCase();
  const valid =
    !acceptedFileTypes.length ||
    acceptedFileTypes.some((accept) => {
      const pattern = accept.trim().toLowerCase();
      if (pattern.startsWith(".")) return file.name.toLowerCase().endsWith(pattern);
      if (pattern.endsWith("/*")) return mime.startsWith(pattern.slice(0, -1));
      return mime === pattern;
    });
  return valid ? null : `${file.name} is not an accepted file type.`;
}

export interface FileUploaderProps {
  label: ReactNode;
  description?: ReactNode;
  acceptedFileTypes?: string[];
  allowsMultiple?: boolean;
  maxSize?: number;
  files?: readonly File[];
  onFilesChange?: (files: File[]) => void;
  isDisabled?: boolean;
  className?: string;
}
export function FileUploader({
  label,
  description,
  acceptedFileTypes,
  allowsMultiple = false,
  maxSize,
  files: controlledFiles,
  onFilesChange,
  isDisabled,
  className,
}: FileUploaderProps) {
  const id = useId();
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const files = controlledFiles ?? localFiles;
  function update(next: File[]) {
    if (controlledFiles === undefined) setLocalFiles(next);
    onFilesChange?.(next);
  }
  function select(incoming: File[]) {
    const messages: string[] = [];
    const accepted = incoming.filter((file) => {
      const reason = acceptsFile(file, acceptedFileTypes, maxSize);
      if (reason) messages.push(reason);
      return !reason;
    });
    setError(messages.join(" "));
    if (!accepted.length) return;
    update(allowsMultiple ? [...files, ...accepted] : accepted.slice(0, 1));
  }
  return (
    <div className={["cinder-file-uploader", className].filter(Boolean).join(" ")}>
      <div id={`${id}-label`} className="cinder-file-label">
        {label}
      </div>
      {description && (
        <p id={`${id}-description`} className="cinder-description">
          {description}
        </p>
      )}
      <DropZone
        aria-labelledby={`${id}-label`}
        aria-describedby={description ? `${id}-description` : undefined}
        isDisabled={isDisabled}
        onDrop={async (event) => {
          const incoming = await Promise.all(
            event.items.filter((item) => item.kind === "file").map((item) => item.getFile()),
          );
          select(incoming);
        }}
      >
        <FileTrigger
          acceptedFileTypes={acceptedFileTypes}
          allowsMultiple={allowsMultiple}
          onSelect={(list) => list && select(Array.from(list))}
        >
          <Button variant="ghost" isDisabled={isDisabled}>
            <span>Drag files here or choose files</span>
            <Icon name="upload" />
          </Button>
        </FileTrigger>
      </DropZone>
      {error && (
        <p role="alert" className="cinder-error-message">
          {error}
        </p>
      )}
      <ul className="cinder-file-list">
        {files.map((file, index) => (
          <li key={`${file.name}-${file.lastModified}-${index}`}>
            <Icon name="file" />
            <span>{file.name}</span>
            <span className="cinder-description">
              {new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(
                file.size / 1024,
              )}{" "}
              KB
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              isDisabled={isDisabled}
              aria-label={`Remove ${file.name}`}
              onPress={() => update(files.filter((_, position) => position !== index))}
            >
              <Icon name="close" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
