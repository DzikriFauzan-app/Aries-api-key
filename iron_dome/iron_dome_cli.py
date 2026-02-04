import sys
from iron_dome.git.git_guard import intercept
from iron_dome.fs.fs_guard import safe_remove, safe_rmtree

def main():
    if len(sys.argv) < 3:
        print("IRON DOME: NO COMMAND")
        sys.exit(1)

    cmd = " ".join(sys.argv[1:])
    intercept(cmd)

    if sys.argv[1] == "rm":
        if sys.argv[2] in ("-rf", "-r"):
            safe_rmtree(sys.argv[3])
            print("IRON DOME: DELETE APPROVED")
        elif len(sys.argv) == 3:
            safe_remove(sys.argv[2])
            print("IRON DOME: DELETE APPROVED")
        else:
            print("IRON DOME: INVALID RM FORMAT")
    else:
        print("IRON DOME: COMMAND LOGGED ONLY")

if __name__ == "__main__":
    main()
