export class MagicValues {
    /* FONT */
    public static FONT_FAMILY = "BerlinSansFBDemi";

    public static SHARED_OBJECT_NAME = "HongJieGame";
    
    /* HORROR THEME COLORS */
    public static HORROR_RED = 0xCC0000;
    public static HORROR_DARK_RED = 0x440000;
    public static HORROR_BLACK = 0x000000;
    public static HORROR_BACKGROUND_TINT = 0x888888;

    public static SIZE_TITLE = 42;
    public static SIZE_DEFAULT = 32;
    public static SIZE_HUD = 22;

    public static BORDER_OFFSET = 18;
    public static BORDER_OFFSET_BOTTOM = 120;
    public static BORDER_OFFSET_POPUP = 60;
    public static BORDER_OFFSET_HUD = 10;

    public static convertTime(secs: number): string {
        const m = Math.floor((secs % 3600) / 60);
        const s = Math.max(Math.floor((secs % 3600) % 60), 0);
        return m.toString() + ": " + (s < 10 ? "0" + s.toString() : s.toString());
    }
}
